README  
======

http://localhost:8080/login -> logowanie. Obsługuję TYLKO requesty POST i przyjmuje TYLKO pliki JSON z loginem i haslem  
  
Przyklad:  
  
{  
"login": "def",  
"password": "def"  
}  
  
http://localhost:8080/api/users/register -> rejestracja. TYLKO POST i TYLKO JSON (login, password, matchingPassword, email, userName) (POST)  
  
  Przyklad:  
    
  {  
  "Token": "string",  
  "emailAddress": "string",  
  "login": "string",  
  "matchingPassword": "string",  
  "password": "string",  
  "userName": "string"  
}    
    
  
http://localhost:8080/api/users/all?token={wartosc_tokenu} -> zwraca liste zarejestrowanych uzytkownikow, wymaga waznego tokenu w linku!!! (GET)  
  
http://localhost:8080/swagger-ui.html#/ -> swagger  
  
http://localhost:8080/api/users/{page} -> zwraca liste zarejestrowanych uzytkownikow podzielona na strony (argumenty: pageNr, size) (GET)  
  
http://localhost:8080/api/users/user/{id} -> zwraca uzytkownika po id (GET)    

  
    
WSZYSTKIE ARGUMENTY I SZKIELETY METOD SPRAWDZAJCIE W SWAGGERZE!!!    
