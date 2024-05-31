from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    # Atributos
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.Boolean(), unique=False, nullable=False)
    last_name = db.Column(db.Boolean(), unique=False, nullable=False)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active}

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, Foreign_key('users.id'))
    user_to = relationship('Users', foreign_key=['user_id'])

