const myEmailAddress = "your-email@example.com"; // Zmień na swój adres e-mail
// Data 80. urodzin
const targetDate = new Date(0000, 00, 00); // Twoja data 80. urodzin

const sleepRatio = 1 / 3; // Zakładany ułamek doby przeznaczony na sen (8 godzin snu na dobę)

const motivationalMessagesSleep = [
  (totalMonths, sleepMonths) =>
    `Do Twoich 80. urodzin pozostało ${totalMonths} miesięcy, z czego około ${sleepMonths} miesięcy prześpisz. Wykorzystaj mądrze pozostały czas!`,
  (totalMonths, sleepMonths) =>
    `Z tych ${totalMonths} miesięcy do osiemdziesiątki, około ${sleepMonths} poświęcisz na regenerację. Czas na aktywność jest cenny!`,
  (totalMonths, sleepMonths) =>
    `Pamiętaj, masz ${totalMonths} miesięcy do 80. urodzin, ale efektywnie, po odjęciu snu (${sleepMonths} miesięcy), Twój czas na życie jest krótszy. Działaj!`,
  (totalMonths, sleepMonths) =>
    `Niech każdy z pozostałych ${totalMonths} miesięcy, pomniejszonych o czas snu (${sleepMonths}), będzie pełen pasji i realizacji!`,
  (totalMonths, sleepMonths) =>
    `Wykorzystaj dobrze te ${totalMonths} miesięcy, pamiętając, że około ${sleepMonths} z nich spędzisz śpiąc. Czas ucieka!`,
  (totalMonths, sleepMonths) =>
    `Myśl o tych ${totalMonths} miesiącach jak o szansie, z której po odjęciu snu (${sleepMonths}) pozostaje mniej. Bądź produktywny!`,
  (totalMonths, sleepMonths) =>
    `Do 80. urodzin masz ${totalMonths} miesięcy. Pamiętaj, że około ${sleepMonths} z nich to czas Twojego odpoczynku. Żyj intensywnie!`,
  (totalMonths, sleepMonths) =>
    `Niech świadomość, że z ${totalMonths} miesięcy około ${sleepMonths} prześpisz, zmotywuje Cię do działania już teraz!`,
];

let messageIndexSleep = 0;

function getDaysDifference(otherDate) {
  const today = new Date();
  const compareDate = otherDate;

  today.setHours(0, 0, 0, 0);
  compareDate.setHours(0, 0, 0, 0);

  const diffMillis = compareDate - today;
  const diffDays = Math.round(diffMillis / (1000 * 60 * 60 * 24));

  return diffDays;
}

function addCommasSimple(number) {
  return number.toLocaleString();
}

function sendSimpleEmail(recipient, subject, body) {
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: body,
  });
}

function sendDaysLeftEmail() {
  const daysLeft = getDaysDifference(targetDate);
  const totalMonths = Math.round(daysLeft / (365.25 / 12));
  const sleepMonths = Math.round(totalMonths * sleepRatio);

  const formattedTotalMonths = addCommasSimple(totalMonths);
  const formattedSleepMonths = addCommasSimple(sleepMonths);

  const currentMessageFunction =
    motivationalMessagesSleep[
      messageIndexSleep % motivationalMessagesSleep.length
    ];
  const body = currentMessageFunction(
    formattedTotalMonths,
    formattedSleepMonths
  );
  const subject = `Odliczanie do 80-tki: ${formattedTotalMonths} miesięcy (z uwzględnieniem snu)!`;

  sendSimpleEmail(myEmailAddress, subject, body);
  messageIndexSleep++;
}
