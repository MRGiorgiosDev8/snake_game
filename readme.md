# Snake Game

1. [Описание](#описание)
2. [Технологии](#технологии)
3. [Возможности](#возможности)
4. [Требования](#требования)
5. [Управление](#управление)
6. [Установка и Запуск](#установка-и-запуск)
7. [Структура Проекта](#структура-проекта)


## Описание

Это классическая игра "Змейка", разработанная с использованием Django на серверной части и JavaScript на клиентской стороне. Игра использует Canvas API для отрисовки змейки и GSAP для анимации элементов интерфейса. Игрок управляет змейкой, целью которой является поедание еды и увеличение длины, при этом избегая столкновения с краями экрана и самой собой.

## Технологии

- **Django**: для серверной части и управления сохранением данных.

- **JavaScript**: для клиентской логики и взаимодействия с HTML5, CSS3, Canvas.

- **GSAP**: для анимации элементов интерфейса.

- **Pillow**: для обработки изображений и работы с графикой в Django.

## Возможности

- Классический игровой процесс "Змейки"
- Анимации интерфейса с использованием GSAP
- Поддержка управления с клавиатуры и геймпада
- Вибрация на геймпаде при поедании еды
- Сохранение счета игрока
- Возможность менять темы интерфейса (обновлено)

## Требования

-  Django для серверной части
- Любой браузер с поддержкой JavaScript и HTML5

## Управление

- **Клавиатура**: Используйте стрелки на клавиатуре для управления движением змейки.
- **Геймпад**: Поддерживаются джойстики для управления змейкой. Подключите геймпад и начните игру!

## Установка и Запуск

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/MRGiorgiosDev8/snake_game.git
    ```

2. Перейдите в директорию проекта:

    ```bash
    cd snake_game
    ```

3. Установите зависимости:

    ```bash
    pip install -r requirements.txt
    ```

4. Запустите сервер Django:

    ```bash
    python manage.py runserver
    ```

5. Откройте браузер и перейдите по адресу `http://127.0.0.1:8000/` для начала игры.


## Структура Проекта

```plaintext
snake_game/
├── snake_game/
│   ├── __init__.py           
│   ├── asgi.py               
│   ├── settings.py           
│   ├── urls.py               
│   └── wsgi.py               
├── game/
│   ├── migrations/           
│   │   └── __init__.py       
│   ├── __init__.py           
│   ├── admin.py              
│   ├── apps.py              
│   ├── models.py
|   ├── tests.py             
│   ├── urls.py               
│   ├── views.py             
│   └── static/
│       ├── game/
│       │   ├── css/
│       │   │   └── styles.css
|       |   |   └── dark-styles.css     
│       │   ├── js/
│       │   │   ├── game.js       
│       │   │   └── rating-animated.js
|       |   |   └── theme-switch.js   
│       │   └── images/
│       │       └── purplesnake.png
|       |       └── snakecartoon1.png 
├── templates/
│   ├── base.html             
│   ├── game.html             
│   ├── home.html             
│   └── score_board.html
├──staticfiles      
└── manage.py                
└── README.md
└── requirements.txt