async function register(){
  const name = document.getElementById('reg-name').value;
  const password = document.getElementById('reg-pass').value;

  const res = await fetch('/api/register',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,password})
  });
  const data = await res.json();
  if(data.error) alert(data.error);
  else alert(data.message);
}

async function login(){
  const name = document.getElementById('login-name').value;
  const password = document.getElementById('login-pass').value;

  const res = await fetch('/api/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,password})
  });
  const data = await res.json();
  if(data.error) alert(data.error);
  else {
    alert(data.message);
    window.currentUser = data.name;
    loadPosts();
  }
}

async function createPost(){
  const text = document.getElementById('post-text').value;
  if(!window.currentUser) return alert('Войдите для поста');

  const res = await fetch('/api/posts',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({author:window.currentUser,text})
  });
  const data = await res.json();
  if(data.error) alert(data.error);
  else loadPosts();
}

async function loadPosts(){
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const container = document.getElementById('posts-container');
  container.innerHTML = '';
  posts.forEach(p=>{
    const div = document.createElement('div');
    div.innerHTML = `<b>${p.author}</b>: ${p.text} <i>${new Date(p.created_at).toLocaleString()}</i>`;
    container.appendChild(div);
  });
}