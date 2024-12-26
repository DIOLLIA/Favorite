package lock.stock.twosmokingbarrels.controller;

import lock.stock.twosmokingbarrels.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userSvc;

    @Autowired
    private UserController(UserService userSvc) {
        this.userSvc = userSvc;
    }

    ;

    //todo createUser POST mapping
    //todo delete logic with username param usage
    @PostMapping("/movies/login")
    public ResponseEntity<String> login(@RequestParam String username,
                                        @RequestParam String password) {

        var user = userSvc.loadUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("User found");
    }

    @GetMapping("/movies/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("GET STUB");
    }
}
