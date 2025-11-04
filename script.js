const storage = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k) || 'null') }catch(e){return null} },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)) },
  rm(k){ localStorage.removeItem(k) }
};
if(!storage.get('sn_users')) storage.set('sn_users', []);
if(!storage.get('sn_posts')) storage.set('sn_posts', []);
if(!storage.get('sn_messages')) storage.set('sn_messages', []);

// uid и время
function uid(p='id'){ return p + '_' + Math.random().toString(36).slice(2,10) }
function now(){ return new Date().toISOString() }

// escape
function esc(s){ return (s||'').toString().replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]) }

// auth
function ui_register(name, pass){
  if(!name || !pass){ alert('Введите имя и пароль'); return; }
  const users = storage.get('sn_users') || [];
  if(users.some(u=>u.name.toLowerCase()===name.toLowerCase())){ alert('Имя занято'); return; }
  const u = { id: uid('u'), name, passHash:btoa(pass), avatar:'', bio:'', createdAt: now() };
  users.push(u); storage.set('sn_users',users);
  storage.set('sn_session',{ userId: u.id });
  location.href = 'feed.html';
}
function ui_login(name, pass){
  if(!name || !pass){ alert('Введите имя и пароль'); return; }
  const users = storage.get('sn_users') || [];
  const u = users.find(x=>x.name.toLowerCase()===name.toLowerCase() && x.passHash===btoa(pass));
  if(!u){ alert('Пользователь не найден или пароль неверен'); return; }
  storage.set('sn_session',{ userId: u.id });
  location.href = 'feed.html';
}
function getSession(){ return storage.get('sn_session') || null }
function logout(){ storage.set('sn_session', null); location.href='index.html' }
function currentUser(){ const s=getSession(); if(!s) return null; return (storage.get('sn_users')||[]).find(u=>u.id===s.userId) || null }

// остальная логика feed/profile/messages остаётся как раньше
// (лайки, комментарии, посты, чат)
// просто без демо-аккаунтов