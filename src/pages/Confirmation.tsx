import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, from, to, total, passengers, bookingCode } = location.state || {};

  if (!bookingCode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl mb-4">Подтверждение не найдено</p>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Icon name="Plane" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-gradient">DukeAir</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center animate-scale-in">
            <CardContent className="pt-12 pb-8">
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-fade-in">
                <Icon name="CheckCircle" size={64} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Заказ подтверждён!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Билеты отправлены на ваш email
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Код бронирования</p>
                <p className="text-3xl font-bold text-primary tracking-wider">{bookingCode}</p>
              </div>

              <Card className="text-left mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Детали рейса</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Рейс</span>
                    <span className="font-medium">{flight.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Маршрут</span>
                    <span className="font-medium">{from} → {to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Время</span>
                    <span className="font-medium">{flight.departure} - {flight.arrival}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Класс</span>
                    <span className="font-medium">{flight.class}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Пассажиров</span>
                    <span className="font-medium">{passengers?.length || 1}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Итого оплачено</span>
                    <span className="font-bold text-primary">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/account')}
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Личный кабинет
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Printer" size={16} className="mr-2" />
                  Распечатать талон
                </Button>
                <Button
                  className="w-full gradient-primary text-white"
                  onClick={() => navigate('/')}
                >
                  <Icon name="Home" size={16} className="mr-2" />
                  На главную
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Info" size={20} />
                Что дальше?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Icon name="Mail" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Электронные билеты отправлены на вашу почту</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Smartphone" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Онлайн-регистрация доступна за 24 часа до вылета</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Clock" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Рекомендуем прибыть в аэропорт за 2 часа до вылета</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="FileText" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <span>Не забудьте паспорт и документы на детей (если есть)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
