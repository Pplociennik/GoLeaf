README  
======

http://localhost:8080/login -> logowanie. Obsługuję TYLKO requesty POST i przyjmuje TYLKO pliki JSON z loginem i haslem  
  
Przyklad:  
  
{  
"login": "def",  
"password": "def"  
}  
  
http://localhost:8080/register -> rejestracja. TYLKO POST i TYLKO JSON (Token (PUSTY! bo przeciez przy rejestracji ie mamy tokenu), login, password, matchingPassword, email, userName) (POST)  
  
  Przyklad:  
    
  {  
  "emailAddress": "string",  
  "login": "string",  
  "matchingPassword": "string",  
  "password": "string",  
  "userName": "string@string.com"  
}    
    
  
http://localhost:8080/api/users/all -> zwraca liste zarejestrowanych uzytkownikow, wymaga waznego tokenu w linku!!! (GET)  
  
http://localhost:8080/swagger-ui.html#/ -> swagger  
  
http://localhost:8080/api/users/{page} -> zwraca liste zarejestrowanych uzytkownikow podzielona na strony (argumenty: pageNr, size) (GET)  
  
http://localhost:8080/api/users/user/{id} -> zwraca uzytkownika po id (GET)    
  
  
    
UWAGA! Po pierwszym uruchomieniu serwera i utworzeniu bazy danych warto wejsc w plik application.properties (znajdujący się w katalogu resources) i zmienicwartosc :  
  
spring.jpa.hibernate.ddl-auto (create -> update)  
  
Inaczej przy kazdym uruchomieniu baza będzie usuwać tabele i tworzyć je od nowa!
  
    
WSZYSTKIE ARGUMENTY I SZKIELETY METOD SPRAWDZAJCIE W SWAGGERZE!!!    
