### todo
integration with steam API
Use https://api.steampowered.com/ISteamApps/GetAppList/v2 to find a game with id
that you have to put into the next request

use https://store.steampowered.com/api/appdetails?appids=380

to find detailed information about the game

about steam api
https://partner.steamgames.com/doc/api

https://partner.steamgames.com/doc/webapi/isteamapps - about endpoints


also it's possible to find a game via search -> extract it's id from the link (app=) 

https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwinrIKi9dWOAxXn_7sIHSLJJmwQFnoECCQQAQ&url=https%3A%2F%2Fstore.steampowered.com%2Fapp%2F65540%2FGothic_1%2F&usg=AOvVaw3qsAU1hxBIpK8jVg2u_gii&opi=89978449
and then perform request to the
https://store.steampowered.com/api/appdetails?appids=65540

### tech