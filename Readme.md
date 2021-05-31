# Anwendung starten

Nachfolgend werden die Schritte zum lokalen hosten der Anwendung beschrieben. Die Installation der MongoDB kann übersprungen werden, dann verwendet Angular Daten die in der Anwendung gespeichert sind.

Es werden Node.js und Python 3.7 benötigt

# Datenbank-Server

1. MongoDB auf dem Rechner installieren
   - MongoDB Community Server herunterladen <https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.0-rc0-signed.msi>
   - Tutorial Folgen <https://www.youtube.com/watch?v=D0U8vD8m1I0>

2. Mongo DB Compass starten 
   - Auf ```connect``` klicken.
   - Neue Datenbank anlegen mit dem Namen ```ReadingTheater``` und der Collection ```Stories```
   - Die erstellte Collection anklicken und die ```Stories.json``` Datei  aus dem ```Database-server``` Ordner 
     asuwählen und in die ```Stories``` Collection importieren

3. Dependencies installieren und Server starten
   1. ```Database-server``` Ordner in der Konsole öffnen.
   2. ```npm install``` ausführen
   3. ```npm run dev```ausführen


# Emotionserkennungs-Server

1. Virtual Enviroment einrichten
   1. ```Emotion-detection-server``` Ordner in der Konsole öffnen.
   2. ```pip install virtualenv``` ausführen
   3. ```virtualenv venv``` eingeben und ausführen (Konsole muss eventuell neu geöffnet werden)
   4. Virtual Enviroment aktivieren mit ```venv\Scripts\activate```

2. Dependencies installieren und Server starten
   1. ```pip install -r requirements.txt``` ausführen
   2. Server mit ```python main.py```starten


# Frontend-application

1. Dependencies installieren und Anwendung starten
   1. ```Frontend-application``` Ordner in der Konsole öffnen.
   2. ```npm install``` ausführen
   3. ```ng serve```ausführen
   4. ```http://localhost:4200/``` im Browser aufrufen
