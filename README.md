 E-commerce Backend API

  built with **NestJS**, **TypeScript**, and **TypeORM**.

  Features :
- **Authentication & Authorization:** Secure login/register with JWT and Role-based (Admin/User).
- **Product Management:** Full CRUD operations for products.
- **User Profiles:** Manage user data and image uploads.
- **Reviews System:** Customers can leave reviews and ratings on products.
- **Email Service:** Automated emails for account verification and notifications using EJS templates.
- **File Uploads:** Integrated image upload functionality for products and user profiles.
- **Database Migrations:** Structured database version control with TypeORM.

 Tech Stack :
- **Framework:** [NestJS]
- **Language:** TypeScript
- **ORM:** TypeORM
- **Database:** PostgreSQL (Neon.tech)
- **Validation:** Class-validator & Class-transformer
- **Templating:** EJS (for emails)

 - src/
├── db/          # Database configuration and migrations
├── mail/        # Email service and templates
├── products/    # Products module (Controller, Service, Entity)
├── review/      # Reviews and ratings logic
├── uploads/     # File upload handling
└── users/       # User management, guards, and decorators



   
