import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to } = location.state || { from: 'Москва', to: 'Стамбул' };

  const [timeRange, setTimeRange] = useState([6, 23]);
  const [showDukeAir, setShowDukeAir] = useState(true);
  const [showPartners, setShowPartners] = useState(true);

  const allFlights = [
    {
      id: 'DU-102',
      airline: 'DukeAir',
      class: 'Эконом',
      departure: '10:00',
      arrival: '13:55',
      duration: '3ч 55м',
      price: 12500,
    },
    {
      id: 'DU-103',
      airline: 'DukeAir',
      class: 'Бизнес',
      departure: '15:30',
      arrival: '19:20',
      duration: '3ч 50м',
      price: 35000,
    },
    {
      id: 'DU-104',
      airline: 'DukeAir',
      class: 'Эконом',
      departure: '21:00',
      arrival: '00:55',
      duration: '3ч 55м',
      price: 9500,
      nextDay: true,
    },
    {
      id: 'PA-205',
      airline: 'Partner Airlines',
      class: 'Эконом',
      departure: '08:30',
      arrival: '12:15',
      duration: '3ч 45м',
      price: 11000,
    },
  ];

  const filteredFlights = allFlights.filter((flight) => {
    const departureHour = parseInt(flight.departure.split(':')[0]);
    const inTimeRange = departureHour >= timeRange[0] && departureHour <= timeRange[1];
    const airlineMatch = 
      (flight.airline === 'DukeAir' && showDukeAir) ||
      (flight.airline === 'Partner Airlines' && showPartners);
    return inTimeRange && airlineMatch;
  });

  const resetFilters = () => {
    setTimeRange([6, 23]);
    setShowDukeAir(true);
    setShowPartners(true);
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
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Рейсы {from} → {to}</h2>
          <p className="text-muted-foreground">Найдено рейсов: {filteredFlights.length}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Фильтры
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Сбросить
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Время вылета: {timeRange[0]}:00 - {timeRange[1]}:00
                  </label>
                  <Slider
                    min={0}
                    max={23}
                    step={1}
                    value={timeRange}
                    onValueChange={setTimeRange}
                    className="mb-2"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium block">Авиакомпания</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dukeair"
                      checked={showDukeAir}
                      onCheckedChange={setShowDukeAir}
                    />
                    <label htmlFor="dukeair" className="text-sm cursor-pointer">
                      DukeAir
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partners"
                      checked={showPartners}
                      onCheckedChange={setShowPartners}
                    />
                    <label htmlFor="partners" className="text-sm cursor-pointer">
                      Partner Airlines
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3 space-y-4">
            {filteredFlights.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">
                  Рейсы не найдены. Попробуйте изменить фильтры
                </p>
              </Card>
            ) : (
              filteredFlights.map((flight, index) => (
                <Card 
                  key={flight.id} 
                  className="hover:shadow-lg transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant={flight.airline === 'DukeAir' ? 'default' : 'secondary'}>
                            {flight.id}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{flight.airline}</span>
                          <Badge variant="outline">{flight.class}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{flight.departure}</div>
                            <div className="text-sm text-muted-foreground">{from}</div>
                          </div>
                          
                          <div className="flex-1 flex flex-col items-center">
                            <div className="text-sm text-muted-foreground mb-1">{flight.duration}</div>
                            <div className="w-full h-0.5 bg-gradient-to-r from-primary to-secondary relative">
                              <Icon 
                                name="Plane" 
                                size={20} 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary bg-white"
                              />
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Прямой рейс</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-3xl font-bold">{flight.arrival}</div>
                            <div className="text-sm text-muted-foreground">
                              {to} {flight.nextDay && '+1'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3 md:border-l md:pl-6">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">
                            {flight.price.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="text-sm text-muted-foreground">за пассажира</div>
                        </div>
                        <Button
                          className="gradient-primary text-white hover:opacity-90"
                          onClick={() => navigate('/booking', { state: { flight, from, to } })}
                        >
                          Выбрать
                          <Icon name="ArrowRight" size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
