use actix_cors::Cors;
use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct NameInput {
    name: String,
}

// Handler for greeting
async fn greet(name: web::Json<NameInput>) -> impl Responder {
    HttpResponse::Ok().json(format!("{} hi", name.name))
}

// Additional handler for saying goodbye
async fn goodbye(name: web::Json<NameInput>) -> impl Responder {
    HttpResponse::Ok().json(format!("Goodbye, {}", name.name))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .route("/greet", web::post().to(greet))      // Route for greeting
            .route("/goodbye", web::post().to(goodbye))  // Additional route for goodbye
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
