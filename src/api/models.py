from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    # Atributos
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}

class Posts(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Corregido ForeignKey
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Post {self.title}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'title': self.title,
                'user_id': self.user_id}

class Comments(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    legend = db.Column(db.String(), nullable=False)
    body = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Comment {self.comment}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'title': self.title,
                'legend': self.legend,
                'body': self.body}

class Planets(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    diameter = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Planet {self.planet}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'diameter': self.diameter}

class Characters(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'<Character {self.character}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'description': self.description}

class Films(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    release = db.Column(db.String(), nullable=False)
    director = db.Column(db.String(), nullable=False)


    def __repr__(self):
        return f'<Film {self.film}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'name': self.name,
                'release': self.release,
                'director': self.director}
