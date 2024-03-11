// src/BrickGame.js
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Typography, Box } from "@mui/material";

const BrickGame = () => {
  const [trayX, setTrayX] = useState(150);
  const [ballX, setBallX] = useState(200);
  const [ballY, setBallY] = useState(350); // Adjusted starting position of the ball
  const [ballSpeedX, setBallSpeedX] = useState(2);
  const [ballSpeedY, setBallSpeedY] = useState(2);
  const [bricks, setBricks] = useState(generateBricks());
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Update tray position based on mouse movement (only left and right)
      setTrayX(Math.min(Math.max(event.clientX - 40, 0), 320));
    };

    const gameLoop = () => {
      if (!isGameOver) {
        const newBallX = ballX + ballSpeedX;
        const newBallY = ballY + ballSpeedY;

        // Check for collisions with the tray
        if (newBallY > 370 && newBallX > trayX && newBallX < trayX + 80) {
          setBallSpeedY(-ballSpeedY);
        }

        // Check for collisions with bricks
        const updatedBricks = [...bricks];
        for (let i = 0; i < updatedBricks.length; i++) {
          const brick = updatedBricks[i];
          if (
            newBallY > brick.y &&
            newBallY < brick.y + brick.height &&
            newBallX > brick.x &&
            newBallX < brick.x + brick.width
          ) {
            updatedBricks.splice(i, 1);
            setBricks(updatedBricks);
            setBallSpeedY(-ballSpeedY);
            break;
          }
        }

        // Check if the ball hits the walls
        if (newBallX < 0 || newBallX > 390) {
          setBallSpeedX(-ballSpeedX);
        }

        // Check if the ball hits the top wall
        if (newBallY < 0) {
          setBallSpeedY(-ballSpeedY);
        }

        // Check if the ball goes out of the screen
        if (newBallY > 390) {
          setIsGameOver(true);
        }

        setBallX(newBallX);
        setBallY(newBallY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const intervalId = setInterval(gameLoop, 16);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, [ballX, ballY, ballSpeedX, ballSpeedY, bricks, isGameOver, trayX]);

  const handleRestartGame = () => {
    setTrayX(150);
    setBallX(200);
    setBallY(350);
    setBallSpeedX(2);
    setBallSpeedY(2);
    setBricks(generateBricks());
    setIsGameOver(false);
  };

  function generateBricks() {
    const generatedBricks = [];
    let brkNumberr = parseInt(Math.random()*10);
    let brkNumberc = parseInt(Math.random() * 10);
    for (let row = 0; row < brkNumberr; row++) {
      for (let col = 0; col < brkNumberc; col++) {
        generatedBricks.push({
          x: col * 40,
          y: row * 20,
          width: 40,
          height: 20,
        });
      }
    }
    return generatedBricks;
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Brick Breaker Game</Typography>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          position: "relative",
          marginTop: "20px",
          height: "400px",
          border: "1px solid #ccc",
        }}
      >
        {bricks.map((brick, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: `${brick.width}px`,
              height: `${brick.height}px`,
              backgroundColor: "#2ecc71",
              borderRadius: "3px",
              left: `${brick.x}px`,
              top: `${brick.y}px`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            backgroundColor: "#ff5733",
            borderRadius: "50%",
            left: ballX + "px",
            top: ballY + "px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "80px",
            height: "10px",
            backgroundColor: "#3498db",
            borderRadius: "5px",
            left: trayX + "px",
            bottom: "5px",
          }}
        />
      </Box>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          Move your mouse to control the tray (left and right).
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          Break all the bricks to win!
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          {isGameOver ? "Game Over!" : ""}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          <button onClick={handleRestartGame}>Restart Game</button>
        </Typography>
      </div>
    </Container>
  );
};

export default BrickGame;
