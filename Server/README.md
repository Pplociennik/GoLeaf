README  
======

http://localhost:8080/login -> logowanie. Obsługuję TYLKO requesty POST i przyjmuje TYLKO pliki JSON z loginem i haslem  
  
Przyklad:  
  
{  
"login": "def",  
"password": "def"  
}  
  
http://localhost:8080/register -> rejestracja. TYLKO POST i TYLKO JSON (login, password, matchingPassword, email, userName) (POST)  
  
  Przyklad:  
    
  {    
  "emailAddress": "string",    
  "login": "string",    
  "matchingPassword": "string",    
  "password": "string",    
  "userName": "string@string.com"    
}      
    
  
http://localhost:8080/api/users/all -> zwraca liste zarejestrowanych uzytkownikow (GET)  
  
http://localhost:8080/swagger-ui.html#/ -> swagger  
  
http://localhost:8080/api/users/{page} -> zwraca liste zarejestrowanych uzytkownikow podzielona na strony (argumenty: pageNr, size) (GET)  
  
http://localhost:8080/api/users/user/{id} -> zwraca uzytkownika po id (GET)    
  
http://localhost:8080/api/users/resetpassword -> przyjmuje JSON z emailem, zwraca wyjątek jeśli konto o podanym emailu nie istnieje. Jeśli istnieje, wysyła email z linkiem potwierdzającym na podany email
  
http://localhost:8080/api/users/requestpasswordvalidate?token={token} -> przyjmuje token z linku potwierdzającego jako parametr. Sprawdza czy token jest ważny (tokeny do resetu haseł mają ważność 15 minut), jeśli nie - wyrzuca wyjątek, jeśli tak - zwraca HttpStatus "OK"
  
http://localhost:8080/api/users/setnewpassword -> przyjmuje JSON:
  
  {
    "matchingPassword": "string",
    "password": "string",
    "token": "string"
  }
    
ustawia nowe hasło dla użytkownika
  
  
  
    
UWAGA! Po pierwszym uruchomieniu serwera i utworzeniu bazy danych warto wejsc w plik application.properties (znajdujący się w katalogu resources) i zmienic wartosc :  
  
spring.jpa.hibernate.ddl-auto (create -> update)  
  
Inaczej przy kazdym uruchomieniu baza będzie usuwać tabele i tworzyć je od nowa!
  
    
WSZYSTKIE ARGUMENTY I SZKIELETY METOD SPRAWDZAJCIE W SWAGGERZE!!!    
