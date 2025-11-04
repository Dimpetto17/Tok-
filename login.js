import { users } from './register.js'; // простой способ для прототипа

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Метод не разрешён'});

  const { name, password } = await req.json();
  const user = users.find(u => u.name === name && u.password === password);

  if (!user) return res.status(400).json({error:'Неверное имя или пароль'});
  res.status(200).json({ message: 'Вход успешен', name });
}