reloadNotification();

function toggleNotificationPanel() {
  document.querySelector('.notification-panel').classList.toggle('notification-show');
}

async function reloadNotification() {
  const res = await fetch("/api/notifications");

  if (res.status == 200) {
    const notifications = await res.json();
    const container = document.querySelector('.notification-panel');
    while(container.firstChild){
      container.removeChild(container.firstChild);
    }
    let count = 0;
    notifications.reverse().forEach(n => {
      if (n.isRead == false) {
        count++;
        displayNotification(n, container);
      }
    })
    document.querySelector('.notification-count').innerHTML = count;
    if(count == 0){
      document.querySelector('.notification-count').style.display = 'none';
    }
  }
}

async function disableNotification(id, e) {
  e.classList.add("isRead");
  const res = await fetch("/api/notifications/" + id, {
    method: 'put',
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ isRead: true })
  })
}

function displayNotification(notification, container) {
  const n = document.createElement('div');
  n.classList.add('notification');
  n.innerHTML = `
     <div class="notification-actions">
     <button onclick="disableNotification('${notification._id}', this)">lu</button>
     </div>
     <h1 class="notification-title">${notification.title}</h1>
     <p>${notification.content}</p>
   `;

  container.appendChild(n);
}

