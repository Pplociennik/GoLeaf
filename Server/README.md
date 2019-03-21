README  
======

http://localhost:8080/login -> logowanie. Obsługuję TYLKO requesty POST i przyjmuje TYLKO pliki JSON z loginem i haslem  
  
Przyklad:  
  
{
"login": "def",  
"password": "def"  
}  
  
http://localhost:8080/api/users/register -> rejestracja. (login, password, matchingPassword) (POST)  
  
http://localhost:8080/api/users/all -> zwraca liste zarejestrowanych uzytkownikow (GET)  
  
http://localhost:8080/swagger-ui.html#/ -> swagger  
  
http://localhost:8080/api/users/{page} -> zwraca liste zarejestrowanych uzytkownikow podzielona na strony (argumenty: pageNr, size) (GET)  
  
http://localhost:8080/api/users/user/{id} -> zwraca uzytkownika po id (GET)  