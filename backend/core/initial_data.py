from core import db, bcrypt

init_users = [
    {"name": "Xénia", "about_user": "app creator"},
    {"name": "Fero", "about_user": "the first user"},
    {"name": "test", "about_user": "test"},
    {"name": "Klotylda", "about_user": "the last user"}
]

init_quotes = [

    {"user_id": 1, "author": "Mitch Hedberg",
     "text": "I'm sick of following my dreams, man. I'm just going to ask where they're going and hook up with "
             "’em later."},
    {"user_id": 1, "author": "Jack Handey",
     "text": "Before you criticize someone, you should walk a mile in their shoes. That way when you criticize "
             "them, you are a mile away from them and you have their shoes."},
    {"user_id": 4, "author": "Will Ferrell",
     "text": "Before you marry a person, you should first make them use a computer with slow Internet to see who "
             "they really are."},
    {"user_id": 3, "author": "Phyllis Diller",
     "text": "I want my children to have all the things I couldn't afford. Then I want to move in with them."},
    {"user_id": 2, "author": "Anonymous",
     "text": "Insomnia sharpens your math skills because you spend all night calculating how much sleep you’ll get "
             "if you’re able to ‘fall asleep right now.’"},
    {"user_id": 2, "author": "Les Dawson",
     "text": "I used to sell furniture for a living. The trouble was, it was my own."},
    {"user_id": 4, "author": "Mindy Kaling",
     "text": "There is no sunrise so beautiful that it is worth waking me up to see it."},
    {"user_id": 2, "author": "Jimmy Kimmel",
     "text": "I never feel more alone than when I’m trying to put sunscreen on my back."},
    {"user_id": 2, "author": "Sheldon Cooper", "text": "I’m not insane. My mother had me tested."},
    {"user_id": 3, "author": "Anonymous",
     "text": "Common sense is like deodorant. The people who need it most never use it."},
]



