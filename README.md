# voltime

Clock app for Volta-Medical

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Voltime</h3>

  <p align="center">
    Voltime is a little stand-alone clocks & alarms app built with Electron, totally offline with TimeZones support.
    <br />
    <br />
    <br />
    <a href="https://github.com/tefricker/voltime/issues">Report Bug</a>
    ·
    <a href="https://github.com/tefricker/voltime/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Voltime time reference is based on your OS time, so you don't need to be online to have international clocks on hand.

It features :

<ul><li>Totally offline</li><li>Alarms</li><li>Clocks with custom names based on timezones</li><li>Light/Dark theme</li><li>Support of "12/24" time format</li></ul>

### Built With

- [![React][React.js]][React-url]
- Electron-JS
- TypeScript

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You need npm

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tefricker/voltime.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build the app in "./out"
   ```sh
   npm run make
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Features to be added

- [ ] I18N with French support
- [ ] Add an ErrorBoundary, I don't think it's error-prone atm due to the fairly easy features it provides (I'm delusional)
- [ ] Online capability with local time sync
- [ ] Better design (didn't have the time)
- [ ] Native notifications (requires some app signing)
- [ ] Support using your own songs as alarm
- [ ] Better way to handle useClock(), quite costly at the moment
- [ ] Remove DayJS as DatePicker adapter
- [ ] Jest tests
- [ ] GithubActions CI

See the [open issues](https://github.com/tefricker/voltime/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/tefricker/voltime.svg?style=for-the-badge
[contributors-url]: https://github.com/tefricker/voltime/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tefricker/voltime.svg?style=for-the-badge
[forks-url]: https://github.com/tefricker/voltime/network/members
[stars-shield]: https://img.shields.io/github/stars/tefricker/voltime.svg?style=for-the-badge
[stars-url]: https://github.com/tefricker/voltime/stargazers
[issues-shield]: https://img.shields.io/github/issues/tefricker/voltime.svg?style=for-the-badge
[issues-url]: https://github.com/tefricker/voltime/issues
[license-shield]: https://img.shields.io/github/license/tefricker/voltime.svg?style=for-the-badge
[license-url]: https://github.com/tefricker/voltime/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
