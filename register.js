let users = []; // временное хранилище пользователей

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Метод не разрешён'});

  const { name, password } = await req.json();
  if (!name || !password) return res.status(400).json({error:'Заполните поля'});

  if (users.find(u => u.name === name)) return res.status(400).json({error:'Имя занято'});

  users.push({ name, password }); // для прототипа пароль хранится как есть
  res.status(200).json({ message: 'Регистрация успешна', name });
}