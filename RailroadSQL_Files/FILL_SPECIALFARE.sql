DELIMITER //

CREATE PROCEDURE FILL_SPECIALFARE()
BEGIN

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('10 Days', '1.15');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('15 Days', '1.1');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('3 Days', '1.4');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('30 Days', '1.05');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('5 Days', '1.25');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('Adult', '1');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('Child', '0.5');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('Elderly', '0.85');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('Disability', '0.9');

  INSERT INTO `SPECIAL_FARE` (`TYPE`, `FACTOR`) VALUES ('Military', '0.9');

  -- Pets incur an extra $25 fee

END //

DELIMITER ;