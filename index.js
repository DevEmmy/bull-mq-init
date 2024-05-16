const amqplib = require("amqplib");
require("dotenv").config();

async function sendMessageToQueue(notification) {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL); // Connect to RabbitMQ
  const channel = await connection.createChannel();

  await channel.assertQueue(process.env.NOTIFICATION_QUEUE); // Ensure queue exists

  const notificationBuffer = Buffer.from(JSON.stringify(notification));
  channel.sendToQueue(process.env.NOTIFICATION_QUEUE, notificationBuffer);

  console.log(`Notification sent to queue: ${notificationBuffer.toString()}`);
  // Close the channel
  await channel.close();
}

// Example usage:
const myMessage = {
  sender: "Emmanuel",
  recipients: [{ recipient: "eolaosebikan60@gmail.com", channel: "EMAIL" }],
  message: "You're Welcome",
  payload: "Hey",
};

sendMessageToQueue(myMessage);
