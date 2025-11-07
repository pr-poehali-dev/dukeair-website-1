import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const PromoDetail = () => {
  const navigate = useNavigate();
  const { promoId } = useParams();
  const [copied, setCopied] = useState(false);

  const promos: Record<string, any> = {
    first15: {
      title: 'Скидка 15% на первый полёт',
      code: 'WELCOME15',
      discount: '15%',
      description: 'DukeAir дарит скидку 15% всем новым клиентам! Зарегистрируйтесь на сайте и используйте промокод при оплате.',
      image: '✈️',
      conditions: [
        'Действительна только для новых пользователей',
        'Применяется к тарифам "Эконом" и "Комфорт"',
        'Действительна до 31 декабря 2023 года',
        'Не суммируется с другими акциями',
        'Минимальная сумма заказа - 5 000 ₽',
      ],
      gradient: 'from-primary to-secondary',
    },
    luggage: {
      title: 'Две сумки бесплатно',
      code: 'LUGGAGE2',
      discount: '2 багажа',
      description: 'При покупке билетов бизнес-класса получите две сумки бесплатно! Экономьте до 4 000 ₽ на багаже.',
      image: '🧳',
      conditions: [
        'Действительна для билетов бизнес-класса',
        'Максимальный вес одной сумки - 23 кг',
        'Действительна до 31 декабря 2023 года',
        'Применяется автоматически при покупке',
        'Не распространяется на ручную кладь',
      ],
      gradient: 'from-accent to-primary',
    },
  };

  const promo = promos[promoId || 'first15'];

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} p-12 mb-8 text-white text-center animate-scale-in`}>
            <div className="text-8xl mb-4">{promo.image}</div>
            <h1 className="text-5xl font-bold mb-4">{promo.discount}</h1>
            <p className="text-2xl mb-6">{promo.title}</p>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              До 31 декабря 2023
            </Badge>
          </div>

          <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={24} />
                Описание акции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{promo.description}</p>
            </CardContent>
          </Card>

          <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileText" size={24} />
                Условия акции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {promo.conditions.map((condition: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Tag" size={24} />
                Промокод
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6 mb-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Используйте этот код при оплате:</p>
                  <div className="text-4xl font-bold tracking-widest text-primary mb-4">
                    {promo.code}
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyPromoCode}
                    className={copied ? 'border-primary text-primary' : ''}
                  >
                    {copied ? (
                      <>
                        <Icon name="Check" size={16} className="mr-2" />
                        Скопировано!
                      </>
                    ) : (
                      <>
                        <Icon name="Copy" size={16} className="mr-2" />
                        Скопировать код
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <Button
                  size="lg"
                  className="gradient-primary text-white hover:opacity-90"
                  onClick={() => navigate('/login')}
                >
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Зарегистрироваться и получить скидку
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="HelpCircle" size={24} />
                Как воспользоваться?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {[
                  { icon: 'UserPlus', text: 'Зарегистрируйтесь на сайте DukeAir' },
                  { icon: 'Search', text: 'Найдите подходящий рейс' },
                  { icon: 'Tag', text: 'Введите промокод на странице оплаты' },
                  { icon: 'CheckCircle', text: 'Получите скидку и завершите бронирование' },
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={step.icon as any} size={18} className="text-primary" />
                        <span className="font-medium">{step.text}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromoDetail;
