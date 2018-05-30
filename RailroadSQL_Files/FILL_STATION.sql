DELIMITER //

CREATE PROCEDURE FILL_STATION()
BEGIN

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Boston - South Station', 'MA');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Boston - Back Bay Station', 'MA');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Route 128', 'MA');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Providence', 'RI');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Kingston', 'RI');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Westerly', 'RI');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Mystic', 'CT');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('New London', 'CT');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Old Saybrook', 'CT');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('New Haven', 'CT');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Bridgeport', 'CT');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Stamford', 'CT');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('New Rochelle', 'NY');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('New York', 'NY');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Newark', 'NJ');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Newark Liberty Intl. Air', 'NJ');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Metropark', 'NJ');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Trenton', 'NJ');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Philadelphia - 30th St Station', 'PA');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Wilmington', 'DE');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Newark', 'DE');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Aberdeen', 'MD');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Baltimore - Penn Station', 'MD');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('BWI Marshall Airport', 'MD');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('New Carrollton', 'MD');

  INSERT INTO `STATION` (`CITY`, `STATE`) VALUES ('Washington', 'DC');

END //

DELIMITER ;
