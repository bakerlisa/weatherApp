async function getCoderData() {
    var response = await fetch("https://dataservice.accuweather.com//forecasts/v1/daily/1day/328734?apikey=AT3aycO0yWOf57KT4uOtVxhk7c4Uka24&language=en-us&details=true&metric=false");
    var coderData = await response.json();
    
    var array = [
        coderData.Headline.Severity,
        coderData.Headline.Category,
        coderData.Headline.Text,
        coderData.DailyForecasts[0].Temperature.Maximum.Value,
        coderData.DailyForecasts[0].Temperature.Minimum.Value,
        coderData.DailyForecasts[0].Day.ShortPhrase,
        coderData.DailyForecasts[0].Day.Icon,
        coderData.DailyForecasts[0].Date
    ];

    
    console.log(coderData);
    console.log(array[7]);
    
    //set data in HTML
    document.querySelector('.severity span').innerHTML = array[0];
    document.querySelector('.type span').innerHTML = array[1];
    document.querySelector('.subtext').innerHTML = array[2];
    document.querySelector('.high').innerHTML = array[3];
    document.querySelector('.low').innerHTML = array[4];
    document.querySelector('.summary').innerHTML = array[5];
    document.querySelector('.icon').src = 
    `https://www.accuweather.com/images/weathericons/${array[6]}.svg`;

    var seasons = ["https://cdn.vox-cdn.com/thumbor/i_DRXWOQKjX0dXrPMI6uPjtwqwo=/0x743:5111x3299/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/19534013/583747376.jpg.jpg",
    "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.pennlive.com/home/penn-media/width2048/img/wildaboutpa/photo/summer-sunrisejpg-8a3de64ee9c00a6e.jpg",
    "https://static.parade.com/wp-content/uploads/2020/03/spring-quotes.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1OZ91_CwoPXiNg53QYIm7jPp9SlTZ9V7IvpmtXyWbfk_iMuguQr4dZQFPBQSTbPNDGZs&usqp=CAU"];

    const dateArray = array[7].split("-");

    if(dateArray[1] == 12 || dateArray[1] == 01 || dateArray[1] == 02 || dateArray[1] == 03){
        document.querySelector("main").style.backgroundImage = "url('"+seasons[0]+"')";
    }else if(dateArray[1] == 04 || dateArray[1] == 05){

    }else if(dateArray[1] == 06 || dateArray[1] == 07){ 

    }else if(dateArray[1] == 08 || dateArray[1] == 09 || dateArray[1] == 10 || dateArray[1] == 11){

    }
    

}
    
getCoderData();
