import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ReturnSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl mb-4">Данные не найдены</p>
          <Button onClick={() => navigate('/account')}>В личный кабинет</Button>
        </Card>
      </div>
    );
  }

  const refundAmount = booking.price - 2000;

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
        <div className="max-w-2xl mx-auto">
          <Card className="text-center animate-scale-in">
            <CardContent className="pt-12 pb-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-fade-in">
                <Icon name="CheckCircle" size={64} className="text-primary" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4">Возврат успешно оформлен</h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Деньги будут зачислены на вашу карту в течение 5-10 рабочих дней
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-4 text-center">Детали возврата</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Код бронирования</span>
                    <span className="font-medium">{booking.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Рейс</span>
                    <span className="font-medium">{booking.flightId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Маршрут</span>
                    <span className="font-medium">{booking.from} → {booking.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Сумма возврата</span>
                      <span className="font-bold text-primary text-xl">
                        {refundAmount.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 mb-2">Что дальше?</p>
                      <ul className="space-y-1 text-blue-800">
                        <li>• Подтверждение отправлено на вашу почту</li>
                        <li>• Средства поступят на карту, с которой была оплата</li>
                        <li>• Вы получите уведомление о зачислении</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/account')}
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    В личный кабинет
                  </Button>
                  <Button
                    className="gradient-primary text-white"
                    onClick={() => navigate('/')}
                  >
                    <Icon name="Home" size={16} className="mr-2" />
                    На главную
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Icon name="Phone" size={20} className="text-muted-foreground flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Нужна помощь?</p>
                  <p className="text-muted-foreground">
                    Свяжитесь с нашей службой поддержки: <br />
                    Телефон: +7-932-059-87-12 <br />
                    Email: support@dukeair.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReturnSuccess;
