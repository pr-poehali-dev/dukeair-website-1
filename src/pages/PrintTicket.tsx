import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PrintTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  useEffect(() => {
    if (!booking) {
      navigate('/account');
    }
  }, [booking, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (!booking) return null;

  return (
    <>
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: white !important;
          }
        }
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>

      <div className="min-h-screen bg-muted/30">
        <header className="bg-white border-b no-print">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <Icon name="Plane" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold text-gradient">DukeAir</h1>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePrint} className="gradient-primary text-white">
                  <Icon name="Printer" size={16} className="mr-2" />
                  Распечатать
                </Button>
                <Button variant="outline" onClick={() => navigate('/account')}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Назад
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border-4 border-dashed border-primary/20">
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2">
                <div className="flex items-center gap-3">
                  <Icon name="Plane" size={48} className="text-primary" />
                  <div>
                    <h1 className="text-3xl font-bold text-gradient">DukeAir</h1>
                    <p className="text-sm text-muted-foreground">Посадочный талон</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Код бронирования</div>
                  <div className="text-2xl font-bold tracking-wider">{booking.code}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Пассажир</div>
                    <div className="text-2xl font-bold">Иван Иванов</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Рейс</div>
                      <div className="text-xl font-bold">{booking.flightId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Дата</div>
                      <div className="text-xl font-bold">{booking.date}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Маршрут</div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{booking.from}</div>
                        <div className="text-sm text-muted-foreground">Вылет</div>
                      </div>
                      <Icon name="ArrowRight" size={32} className="text-primary" />
                      <div className="text-center">
                        <div className="text-3xl font-bold">{booking.to}</div>
                        <div className="text-sm text-muted-foreground">Прилёт</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Время вылета</div>
                      <div className="text-3xl font-bold">{booking.departure}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Выход / Gate</div>
                      <div className="text-3xl font-bold text-primary">{booking.gate}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Место / Seat</div>
                      <div className="text-3xl font-bold text-primary">{booking.seat}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Класс</div>
                      <div className="text-xl font-bold">{booking.class}</div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 flex flex-col items-center justify-center bg-muted/30">
                    <div className="text-8xl mb-2">▄▄▄▄▄</div>
                    <div className="text-xs text-muted-foreground">QR-код для регистрации</div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 pt-6">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Icon name="AlertCircle" size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-2">
                      <strong>Важная информация:</strong>
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Прибудьте в аэропорт за 2 часа до вылета</li>
                      <li>Имейте при себе документ, удостоверяющий личность</li>
                      <li>Посадка заканчивается за 20 минут до вылета</li>
                      <li>Сохраните этот талон до конца поездки</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-muted-foreground border-t pt-6">
                <p>Приятного полёта с DukeAir! · Служба поддержки: +7-932-059-87-12</p>
              </div>
            </div>

            <div className="no-print mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Нажмите кнопку "Распечатать" в верхней части страницы или используйте Ctrl+P
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintTicket;
