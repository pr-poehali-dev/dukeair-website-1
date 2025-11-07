import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const citySuggestions = {
    from: [
      { name: 'Москва', code: 'MOW' },
      { name: 'Мостар', code: 'OMO' },
    ],
    to: [
      { name: 'Лондон', code: 'LON' },
      { name: 'Лос-Анджелес', code: 'LAX' },
      { name: 'Стамбул', code: 'IST' },
      { name: 'Дубай', code: 'DXB' },
    ],
  };

  const handleSearch = () => {
    if (fromCity && toCity) {
      navigate('/search', { state: { from: fromCity, to: toCity } });
    }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plane" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gradient">DukeAir</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#promo" className="text-sm font-medium hover:text-primary transition-colors">Акции</a>
              <a href="#info" className="text-sm font-medium hover:text-primary transition-colors">Информация</a>
              <a href="#support" className="text-sm font-medium hover:text-primary transition-colors">Поддержка</a>
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Личный кабинет
              </Button>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.9), rgba(14, 165, 233, 0.9)), url('https://cdn.poehali.dev/projects/c4491e52-f501-4f5e-8583-724180b9b402/files/d0457f15-5b24-4ceb-a225-8047433da269.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Откройте мир с DukeAir
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Комфортные перелёты в любую точку планеты
            </p>
          </div>

          <Card className="max-w-5xl mx-auto shadow-2xl animate-scale-in">
            <CardContent className="p-6">
              <Tabs defaultValue="one-way" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                  <TabsTrigger value="one-way">В одну сторону</TabsTrigger>
                  <TabsTrigger value="round-trip">Туда-обратно</TabsTrigger>
                </TabsList>
                <TabsContent value="one-way" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="text-sm font-medium mb-2 block">Откуда</label>
                      <div className="relative">
                        <Icon name="MapPin" size={20} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          placeholder="Город вылета"
                          value={fromCity}
                          onChange={(e) => {
                            setFromCity(e.target.value);
                            setShowFromSuggestions(e.target.value.length > 0);
                          }}
                          onFocus={() => setShowFromSuggestions(fromCity.length > 0)}
                          className="pl-10"
                        />
                        {showFromSuggestions && (
                          <Card className="absolute top-full mt-2 w-full z-20 shadow-lg">
                            <CardContent className="p-2">
                              {citySuggestions.from
                                .filter(city => 
                                  city.name.toLowerCase().includes(fromCity.toLowerCase())
                                )
                                .map((city) => (
                                  <button
                                    key={city.code}
                                    className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                                    onClick={() => {
                                      setFromCity(city.name);
                                      setShowFromSuggestions(false);
                                    }}
                                  >
                                    <span>{city.name}</span>
                                    <Badge variant="secondary">{city.code}</Badge>
                                  </button>
                                ))}
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-sm font-medium mb-2 block">Куда</label>
                      <div className="relative">
                        <Icon name="MapPin" size={20} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          placeholder="Город прилёта"
                          value={toCity}
                          onChange={(e) => {
                            setToCity(e.target.value);
                            setShowToSuggestions(e.target.value.length > 0);
                          }}
                          onFocus={() => setShowToSuggestions(toCity.length > 0)}
                          className="pl-10"
                        />
                        {showToSuggestions && (
                          <Card className="absolute top-full mt-2 w-full z-20 shadow-lg">
                            <CardContent className="p-2">
                              {citySuggestions.to
                                .filter(city => 
                                  city.name.toLowerCase().includes(toCity.toLowerCase())
                                )
                                .map((city) => (
                                  <button
                                    key={city.code}
                                    className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                                    onClick={() => {
                                      setToCity(city.name);
                                      setShowToSuggestions(false);
                                    }}
                                  >
                                    <span>{city.name}</span>
                                    <Badge variant="secondary">{city.code}</Badge>
                                  </button>
                                ))}
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Дата вылета</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Пассажиры</label>
                      <Input type="number" defaultValue="1" min="1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Класс</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Эконом</option>
                        <option>Бизнес</option>
                        <option>Первый класс</option>
                      </select>
                    </div>
                  </div>
                  <Button 
                    className="w-full gradient-primary text-white hover:opacity-90 transition-opacity h-12 text-lg font-semibold"
                    onClick={handleSearch}
                  >
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти рейсы
                  </Button>
                </TabsContent>
                <TabsContent value="round-trip" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Откуда</label>
                      <Input placeholder="Город вылета" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Куда</label>
                      <Input placeholder="Город прилёта" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Туда</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Обратно</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Пассажиры</label>
                      <Input type="number" defaultValue="1" min="1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Класс</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                        <option>Эконом</option>
                        <option>Бизнес</option>
                        <option>Первый класс</option>
                      </select>
                    </div>
                  </div>
                  <Button className="w-full gradient-primary text-white hover:opacity-90 transition-opacity h-12 text-lg font-semibold">
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти рейсы
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="destinations" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Популярные направления</h3>
            <p className="text-muted-foreground text-lg">Выгодные предложения на лучшие маршруты</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'Стамбул', price: '8 500', image: '🕌' },
              { city: 'Дубай', price: '25 000', image: '🏜️' },
              { city: 'Париж', price: '15 500', image: '🗼' },
              { city: 'Токио', price: '35 000', image: '🗾' },
            ].map((dest) => (
              <Card key={dest.city} className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in">
                <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl">
                  {dest.image}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{dest.city}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    от {dest.price} ₽
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:gradient-primary group-hover:text-white transition-all"
                    onClick={() => navigate('/search', { state: { to: dest.city } })}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="promo" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Специальные акции</h3>
            <p className="text-muted-foreground text-lg">Экономьте на перелётах с нашими предложениями</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="gradient-primary text-white overflow-hidden group hover:scale-105 transition-transform animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Скидка 15% на первый полёт</CardTitle>
                    <CardDescription className="text-white/90">
                      Для новых клиентов DukeAir
                    </CardDescription>
                  </div>
                  <Icon name="Gift" size={48} className="text-white/80" />
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-4">Промокод: FIRST15</Badge>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate('/promo/first15')}
                >
                  Узнать больше
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-accent text-white overflow-hidden group hover:scale-105 transition-transform animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Две сумки бесплатно</CardTitle>
                    <CardDescription className="text-white/90">
                      При покупке билетов бизнес-класса
                    </CardDescription>
                  </div>
                  <Icon name="Luggage" size={48} className="text-white/80" />
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="mb-4">До 31 декабря</Badge>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate('/promo/luggage')}
                >
                  Узнать больше
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="info" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Почему DukeAir?</h3>
            <p className="text-muted-foreground text-lg">Ваш надёжный партнёр в путешествиях</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: 'Shield', title: 'Безопасность', desc: 'Современный флот с высочайшими стандартами безопасности' },
              { icon: 'Clock', title: 'Пунктуальность', desc: '95% рейсов вылетают точно по расписанию' },
              { icon: 'Heart', title: 'Комфорт', desc: 'Просторные кресла и первоклассный сервис на борту' },
            ].map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow animate-fade-in">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer id="support" className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">DukeAir</h4>
              <p className="text-white/80">Откройте мир с нами</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Услуги</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Управление бронированием</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Онлайн-регистрация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Статус рейса</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Информация</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Правила перевозки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Программа лояльности</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Поддержка 24/7</h4>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7-932-059-87-12
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@dukeair.com
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2024 DukeAir. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
