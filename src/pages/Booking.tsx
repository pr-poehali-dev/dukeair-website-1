import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  passport: string;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, from, to } = location.state || {};

  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: '1', firstName: '', lastName: '', birthDate: '', passport: '' },
  ]);
  const [insurance, setInsurance] = useState(true);
  const [seatSelection, setSeatSelection] = useState(true);
  const [priorityBoarding, setPriorityBoarding] = useState(false);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('12A');

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { id: Date.now().toString(), firstName: '', lastName: '', birthDate: '', passport: '' },
    ]);
  };

  const updatePassenger = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(passengers.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const calculateTotal = () => {
    let total = flight?.price || 0;
    if (insurance) total += 1500;
    if (seatSelection) total += 800;
    if (priorityBoarding) total += 500;
    return total * passengers.length;
  };

  const seatRows = ['A', 'B', 'C', '', 'D', 'E', 'F'];
  const occupiedSeats = ['1A', '1B', '3C', '5D', '7E', '10F', '11A'];

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl mb-4">Рейс не выбран</p>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <Icon name="Plane" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gradient">DukeAir</h1>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Бронирование билета</h2>
            <p className="text-muted-foreground">
              Рейс {flight.id}: {from} → {to}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} />
                    Шаг 1: Данные пассажиров
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={passenger.id} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Пассажир {index + 1}</h4>
                        {passengers.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPassengers(passengers.filter(p => p.id !== passenger.id))}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Имя</label>
                          <Input
                            placeholder="Иван"
                            value={passenger.firstName}
                            onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Фамилия</label>
                          <Input
                            placeholder="Иванов"
                            value={passenger.lastName}
                            onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Дата рождения</label>
                          <Input
                            type="date"
                            value={passenger.birthDate}
                            onChange={(e) => updatePassenger(passenger.id, 'birthDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Номер паспорта</label>
                          <Input
                            placeholder="1234 567890"
                            value={passenger.passport}
                            onChange={(e) => updatePassenger(passenger.id, 'passport', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={addPassenger}>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить пассажира
                  </Button>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Package" size={24} />
                    Шаг 2: Дополнительные услуги
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="insurance"
                      checked={insurance}
                      onCheckedChange={setInsurance}
                    />
                    <div className="flex-1">
                      <label htmlFor="insurance" className="font-medium cursor-pointer flex items-center gap-2">
                        Страховка "Все включено"
                        <Badge variant="secondary">+1 500 ₽</Badge>
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Защита от отмены рейса, потери багажа и медицинская страховка
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="seat"
                      checked={seatSelection}
                      onCheckedChange={setSeatSelection}
                    />
                    <div className="flex-1">
                      <label htmlFor="seat" className="font-medium cursor-pointer flex items-center gap-2">
                        Выбор места (у окна)
                        <Badge variant="secondary">+800 ₽</Badge>
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Текущее место: {selectedSeat}
                      </p>
                      {seatSelection && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowSeatMap(true)}
                        >
                          Выбрать место на схеме
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      id="priority"
                      checked={priorityBoarding}
                      onCheckedChange={setPriorityBoarding}
                    />
                    <div className="flex-1">
                      <label htmlFor="priority" className="font-medium cursor-pointer flex items-center gap-2">
                        Приоритетная посадка
                        <Badge variant="secondary">+500 ₽</Badge>
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Посадка в числе первых пассажиров
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                  <CardDescription>Рейс {flight.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Билет × {passengers.length}</span>
                      <span>{(flight.price * passengers.length).toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {insurance && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Страховка × {passengers.length}</span>
                        <span>+{(1500 * passengers.length).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    {seatSelection && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Выбор места × {passengers.length}</span>
                        <span>+{(800 * passengers.length).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    {priorityBoarding && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Приоритет × {passengers.length}</span>
                        <span>+{(500 * passengers.length).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Всего</span>
                    <span className="text-primary">{calculateTotal().toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Button
                    className="w-full gradient-primary text-white hover:opacity-90 h-12 text-lg"
                    onClick={() => navigate('/payment', { state: { flight, from, to, total: calculateTotal(), passengers } })}
                  >
                    Перейти к оплате
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showSeatMap} onOpenChange={setShowSeatMap}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Выберите место</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-center mb-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 rounded bg-white"></div>
                <span className="text-sm">Свободно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 rounded bg-muted"></div>
                <span className="text-sm">Занято</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-primary rounded bg-primary/20"></div>
                <span className="text-sm">Выбрано</span>
              </div>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row) => (
                <div key={row} className="flex items-center gap-2 justify-center">
                  <span className="w-6 text-center text-sm font-medium">{row}</span>
                  {seatRows.map((seat, idx) => {
                    if (!seat) return <div key={idx} className="w-8"></div>;
                    const seatCode = `${row}${seat}`;
                    const isOccupied = occupiedSeats.includes(seatCode);
                    const isSelected = selectedSeat === seatCode;
                    return (
                      <button
                        key={seatCode}
                        disabled={isOccupied}
                        onClick={() => setSelectedSeat(seatCode)}
                        className={`w-8 h-8 border-2 rounded text-xs font-medium transition-all ${
                          isOccupied
                            ? 'bg-muted cursor-not-allowed'
                            : isSelected
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'hover:border-primary hover:bg-primary/10'
                        }`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <Button className="w-full mt-6" onClick={() => setShowSeatMap(false)}>
              Подтвердить место {selectedSeat}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Booking;
