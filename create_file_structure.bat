@echo off
:: Create directories
mkdir src\app\login src\app\register src\app\dashboard src\app\passwords src\app\cards src\app\settings
mkdir src\components src\lib src\models src\utils src\styles public\card-logos

:: Create files
echo. > src\app\layout.tsx
echo. > src\app\page.tsx
echo. > src\app\login\page.tsx
echo. > src\app\register\page.tsx
echo. > src\app\dashboard\page.tsx
echo. > src\app\passwords\page.tsx
echo. > src\app\cards\page.tsx
echo. > src\app\settings\page.tsx
echo. > src\components\AuthForm.tsx
echo. > src\components\CreditCardDisplay.tsx
echo. > src\components\PasswordCard.tsx
echo. > src\components\ThemeToggle.tsx
echo. > src\components\Navbar.tsx
echo. > src\components\Sidebar.tsx
echo. > src\lib\dbConnect.ts
echo. > src\lib\auth.ts
echo. > src\lib\crypto.ts
echo. > src\models\User.ts
echo. > src\models\Password.ts
echo. > src\models\Card.ts
echo. > src\utils\validators.ts
echo. > src\styles\globals.css
echo. > .env.local
echo. > middleware.ts
echo. > tailwind.config.ts

echo File structure created successfully!