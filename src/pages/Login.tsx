import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/account');
  };

  const handleRegister = () => {
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Plane" size={40} className="text-primary" />
              <h1 className="text-3xl font-bold text-gradient">DukeAir</h1>
            </div>
          </div>
          <CardTitle>Добро пожаловать</CardTitle>
          <CardDescription>Войдите или создайте новый аккаунт</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email или телефон</label>
                <Input
                  type="text"
                  placeholder="ivan@example.com или +7 900 000 00 00"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Пароль</label>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Забыли пароль?
                </a>
              </div>
              <Button
                className="w-full gradient-primary text-white hover:opacity-90 h-11"
                onClick={handleLogin}
              >
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input placeholder="Иван" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Фамилия</label>
                  <Input placeholder="Иванов" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="ivan@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Телефон</label>
                <Input type="tel" placeholder="+7 900 000 00 00" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Пароль</label>
                <Input type="password" placeholder="Минимум 6 символов" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Повторите пароль</label>
                <Input type="password" placeholder="Повторите пароль" />
              </div>
              <Button
                className="w-full gradient-primary text-white hover:opacity-90 h-11"
                onClick={handleRegister}
              >
                <Icon name="UserPlus" size={18} className="mr-2" />
                Зарегистрироваться
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
