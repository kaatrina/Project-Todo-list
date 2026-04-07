import support from './face-agent.png';
import update from './sync.png';

export function headerLoad(){

    const head = document.querySelector('.header')

    head.innerHTML = '';
    
    const syncIcon = document.createElement('img')
    syncIcon.src = update

    syncIcon.addEventListener('click', () => {location.reload()})

    head.appendChild(syncIcon)

    const supportLink = document.createElement('a')

    head.appendChild(supportLink)
    const supportIcon = document.createElement('img')
    supportLink.href = 'https://t.me/kaatrin_aa';
    supportLink.target = '_blank';
    supportIcon.src = support
    supportLink.appendChild(supportIcon)

}
