package lock.stock.twosmokingbarrels.service;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.protobuf.services.ProtoReflectionService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;

@Component
@Getter
@Slf4j
public class GrpcApplication {
    private final OstService ostService;
    private Server server;
    @Value("${app.grpc.port}")
    private int appPort;

    public GrpcApplication(OstService ostService) {
        this.ostService = ostService;
    }

    @PostConstruct
    public void start() throws IOException {
        server = ServerBuilder
                .forPort(appPort)
                .addService(ostService)
                .addService(ProtoReflectionService.newInstance())
                .build()
                .start();
        log.info("gRPC server started, listening on {}", appPort);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            log.info("Shutting down gRPC server");
            this.stop();
        }));
    }

    @PreDestroy
    public void stop() {
        if (server != null) {
            server.shutdown();
            log.info("gRPC server shut down");
        }
    }
}
