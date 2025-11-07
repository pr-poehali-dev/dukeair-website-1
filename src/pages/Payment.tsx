import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, from, to, total, passengers } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [discount, setDiscount] = useState(0);

  const validPromoCodes: Record<string, { discount: number; name: string }> = {
    WELCOME15: { discount: 0.15, name: 'Скидка 15% на первый полёт' },
    FIRST15: { discount: 0.15, name: 'Скидка 15% для новых клиентов' },
    LUGGAGE2: { discount: 0, name: 'Две сумки бесплатно' },
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (validPromoCodes[code]) {
      const discountAmount = Math.round(total * validPromoCodes[code].discount);
      setDiscount(discountAmount);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Неверный или неактивный промокод');
      setDiscount(0);
    }
  };

  const finalTotal = total - discount;

  const handlePayment = () => {
    setShowConfirmDialog(true);
  };

  const confirmPayment = () => {
    setShowConfirmDialog(false);
    setIsProcessing(true);
    setTimeout(() => {
      const bookingCode = `DUKE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      navigate('/confirmation', { state: { flight, from, to, total: finalTotal, passengers, bookingCode } });
    }, 5000);
  };

  if (!flight || !total) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl mb-4">Данные бронирования не найдены</p>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </Card>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold mb-2">Обработка платежа</h3>
          <p className="text-muted-foreground">Пожалуйста, подождите...</p>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Оплата</h2>
            <p className="text-muted-foreground">
              Рейс {flight.id}: {from} → {to}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={24} />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Icon name="CreditCard" size={20} />
                          Банковская карта
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex-1 cursor-pointer flex items-center gap-2">
                          <Icon name="Wallet" size={20} />
                          Электронный кошелёк
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Номер карты</label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Срок действия</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">CVV</label>
                          <Input placeholder="123" type="password" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Имя держателя</label>
                        <Input placeholder="IVAN IVANOV" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email кошелька</label>
                        <Input placeholder="email@example.com" type="email" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} />
                    Пассажиры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {passengers?.map((passenger: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Icon name="User" size={16} className="text-muted-foreground" />
                        <span>
                          {passenger.firstName || 'Имя'} {passenger.lastName || 'Фамилия'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle>Итого к оплате</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Рейс</span>
                      <span>{flight.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Маршрут</span>
                      <span>{from} → {to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Время</span>
                      <span>{flight.departure} - {flight.arrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Класс</span>
                      <span>{flight.class}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium mb-2 block">Есть промокод?</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Введите промокод..."
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button
                        variant="outline"
                        onClick={applyPromoCode}
                        disabled={promoApplied || !promoCode}
                      >
                        {promoApplied ? 'Применён' : 'Применить'}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <Icon name="CheckCircle" size={16} />
                        Промокод применен! Скидка {discount.toLocaleString('ru-RU')} ₽
                      </p>
                    )}
                    {promoError && (
                      <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                        <Icon name="XCircle" size={16} />
                        {promoError}
                      </p>
                    )}
                  </div>
                  <Separator />
                  {discount > 0 && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Стоимость</span>
                        <span>{total.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Скидка</span>
                        <span>-{discount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Separator />
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Всего</span>
                    <span className="text-primary">{finalTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Button
                    className="w-full gradient-primary text-white hover:opacity-90 h-12 text-lg"
                    onClick={handlePayment}
                  >
                    <Icon name="Lock" size={20} className="mr-2" />
                    Оплатить {finalTotal.toLocaleString('ru-RU')} ₽
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с условиями
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Icon name="AlertCircle" size={24} className="text-primary" />
              Подтверждение оплаты
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-2">
              Вы подтверждаете оплату <span className="font-bold text-foreground">{finalTotal.toLocaleString('ru-RU')} ₽</span> за рейс{' '}
              <span className="font-bold text-foreground">{flight.id}</span> {from}-{to}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Вернуться и проверить</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPayment}
              className="gradient-primary text-white"
            >
              Подтвердить оплату
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Payment;