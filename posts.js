let posts = []; // временное хранилище постов

export default async function handler(req,res){
  if(req.method === 'GET'){
    res.status(200).json(posts.reverse());
  } else if(req.method === 'POST'){
    const { author, text } = await req.json();
    if(!author || !text) return res.status(400).json({error:'Заполните поля'});
    posts.push({ author, text, created_at: new Date().toISOString() });
    res.status(200).json({message:'Пост создан'});
  } else {
    res.status(405).json({error:'Метод не разрешён'});
  }
}