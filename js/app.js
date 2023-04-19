// 
let weather = {
    apiKey: "0fabf35ce237c209a121492a5fe40646",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    const alert = document.querySelector('.error');
                    alert.classList.add("alert");
                    alert.textContent = "No se ha encontrado la ubicación.";
                    throw new Error("No se ha encontrado la ubicación.");
                }
                return response.json();
            })
            .then((data) => {
                this.displayWeather(data);
                this.fetchTime(data.coord.lat, data.coord.lon);
            })
        // Ocultar la alerta después de 5 segundos
        const alert = document.querySelector(".error");
        if (alert) {
            setTimeout(() => {
                alert.classList.remove("alert");
                alert.textContent = "";
            }, 5000);
        }
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Temperatura en " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humedad: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Velocidad del viento: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    fetchTime: function (lat, lon) {
        fetch(
            "https://api.timezonedb.com/v2.1/get-time-zone?key=KM413G928NM4&format=json&by=position&lat=" +
            lat +
            "&lng=" +
            lon
        )
            .then((response) => {
                if (!response.ok) {
                    const alert = document.querySelector('.error');
                    alert.classList.add("alert");
                    alert.textContent = "No se ha encontrado la hora.";
                    throw new Error("No se ha encontrado la hora del sitio.");
                }
                return response.json();
            })
            .then((data) => this.displayTime(data));
        const alert = document.querySelector(".error");
        if (alert) {
            setTimeout(() => {
                alert.classList.remove("alert");
                alert.textContent = "";
            }, 5000);
        }

    },

    displayTime: function (data) {

        const { formatted } = data;
        const time = new Date(formatted);

        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const hourString = hours < 10 ? "0" + hours : hours;
        const minuteString = minutes < 10 ? "0" + minutes : minutes;
        const secondString = seconds < 10 ? "0" + seconds : seconds;

        const timeString = hourString + ":" + minuteString + ":" + secondString;

        document.querySelector(".time").innerText = ""; // Eliminar el texto anterior

        const clock = document.createElement("div");
        clock.classList.add("clock");

        const hourHand = document.createElement("div");
        hourHand.classList.add("hour-hand");
        hourHand.style.transform = `rotate(${(hours % 12) * 30}deg)`;

        const minuteHand = document.createElement("div");
        minuteHand.classList.add("minute-hand");
        minuteHand.style.transform = `rotate(${minutes * 6}deg)`;

        const secondHand = document.createElement("div");
        secondHand.classList.add("second-hand");
        secondHand.style.transform = `rotate(${seconds * 6}deg)`;

        const timeDisplay = document.createElement("div");
        timeDisplay.classList.add("time-display");
        timeDisplay.innerText = "Hora: " + timeString;

        clock.appendChild(hourHand);
        clock.appendChild(minuteHand);
        clock.appendChild(secondHand);
        clock.appendChild(timeDisplay);

        document.querySelector(".time").appendChild(clock);
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("China");
