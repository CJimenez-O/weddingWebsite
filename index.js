const countdown = () =>{
    const countDate = new Date("November 18, 2022 00:00:00");
    const now = new Date().getTime();
    const gap = countDate - now;

    const second =  1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24; 

    const textDay = Math.floor(gap/day);
    const textHour = Math.floor((gap % day ) / hour);
    const textMinute = Math.floor( (gap % hour) / minute );
    const textSecond = Math.floor( (gap % minute ) / second );
    
    document.querySelector('.days').innerText = textDay + ' Days';
    document.querySelector('.hours').innerText = textHour + ' Hours';
    document.querySelector('.minutes').innerText = textMinute + ' Minutes';
    document.querySelector('.seconds').innerText = textSecond + ' Seconds';
}

setInterval(countdown, 1000);