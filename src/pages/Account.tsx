import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';

const Account = () => {
  const navigate = useNavigate();
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const bookings = [
    {
      code: 'DUKE-8A2B3C',
      flightId: 'DU-102',
      from: 'Москва',
      to: 'Стамбул',
      date: '25 октября 2023',
      departure: '10:00',
      arrival: '13:55',
      class: 'Эконом',
      seat: '15A',
      gate: '45',
      price: 14800,
      status: 'active',
      passengers: 1,
    },
    {
      code: 'DUKE-9F3D4E',
      flightId: 'DU-205',
      from: 'Дубай',
      to: 'Москва',
      date: '15 сентября 2023',
      departure: '14:30',
      arrival: '19:45',
      class: 'Бизнес',
      seat: '2C',
      gate: '12',
      price: 35000,
      status: 'completed',
      passengers: 2,
    },
  ];

  const handleReturnTicket = (booking: any) => {
    setSelectedBooking(booking);
    setShowReturnDialog(true);
  };

  const confirmReturn = () => {
    setShowReturnDialog(false);
    navigate('/return-success', { state: { booking: selectedBooking } });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <Icon name="Plane" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gradient">DukeAir</h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Здравствуйте, Иван!</h2>
            <p className="text-muted-foreground">Управляйте своими бронированиями и профилем</p>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="bookings">Мои бронирования</TabsTrigger>
              <TabsTrigger value="profile">Мои данные</TabsTrigger>
              <TabsTrigger value="bonuses">Мои бонусы</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              {bookings.map((booking, index) => (
                <Card key={booking.code} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 mb-2">
                          Рейс {booking.flightId}
                          <Badge variant={booking.status === 'active' ? 'default' : 'secondary'}>
                            {booking.status === 'active' ? 'Активный' : 'Завершён'}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base">
                          Код бронирования: <span className="font-semibold text-foreground">{booking.code}</span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{booking.price.toLocaleString('ru-RU')} ₽</div>
                        <div className="text-sm text-muted-foreground">за {booking.passengers} пасс.</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="MapPin" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Маршрут:</span>
                          <span className="font-medium">{booking.from} → {booking.to}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Дата:</span>
                          <span className="font-medium">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Время:</span>
                          <span className="font-medium">{booking.departure} - {booking.arrival}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Armchair" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Класс:</span>
                          <span className="font-medium">{booking.class}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="MapPinned" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Место:</span>
                          <span className="font-medium">{booking.seat}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="DoorOpen" size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Выход:</span>
                          <span className="font-medium">{booking.gate}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-3 flex-wrap">
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Детали
                      </Button>
                      {booking.status === 'active' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate('/print-ticket', { state: { booking } })}
                          >
                            <Icon name="Printer" size={16} className="mr-2" />
                            Распечатать талон
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReturnTicket(booking)}
                          >
                            <Icon name="RotateCcw" size={16} className="mr-2" />
                            Вернуть билет
                          </Button>
                          <Button variant="default" size="sm" className="gradient-primary text-white">
                            <Icon name="CheckCircle" size={16} className="mr-2" />
                            Зарегистрироваться Online
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="profile">
              <Card className="max-w-2xl mx-auto animate-fade-in">
                <CardHeader>
                  <CardTitle>Личные данные</CardTitle>
                  <CardDescription>Обновите информацию о себе</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Имя</label>
                      <Input defaultValue="Иван" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Фамилия</label>
                      <Input defaultValue="Иванов" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" defaultValue="ivan@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input type="tel" defaultValue="+7 932 059 87 12" />
                  </div>
                  <Separator />
                  <Button className="gradient-primary text-white">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить изменения
                  </Button>
                  <Button variant="outline" className="ml-2">
                    <Icon name="Key" size={16} className="mr-2" />
                    Изменить пароль
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bonuses">
              <Card className="max-w-2xl mx-auto animate-fade-in">
                <CardHeader>
                  <CardTitle>Программа лояльности</CardTitle>
                  <CardDescription>Копите бонусы и получайте скидки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-8 bg-gradient-to-br from-primary to-secondary rounded-lg text-white">
                    <div className="text-5xl font-bold mb-2">2,450</div>
                    <div className="text-lg">бонусных миль</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Рейс DU-205</div>
                        <div className="text-sm text-muted-foreground">15 сентября 2023</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">+1,200 миль</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Регистрация</div>
                        <div className="text-sm text-muted-foreground">1 августа 2023</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">+500 миль</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AlertDialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Icon name="RotateCcw" size={24} className="text-primary" />
              Возврат билета
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-4">
              <div className="text-foreground">
                <div className="font-semibold mb-2">Детали возврата:</div>
                <div className="space-y-1 text-sm">
                  <div>Рейс: {selectedBooking?.flightId}</div>
                  <div>Маршрут: {selectedBooking?.from} → {selectedBooking?.to}</div>
                  <div>Дата: {selectedBooking?.date}</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Стоимость билета:</span>
                  <span>{selectedBooking?.price.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm text-destructive">
                  <span>Штраф за возврат:</span>
                  <span>-2 000 ₽</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base">
                  <span>К возврату:</span>
                  <span className="text-primary">
                    {((selectedBooking?.price || 0) - 2000).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReturn}
              className="gradient-primary text-white"
            >
              Подтвердить возврат
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Account;
