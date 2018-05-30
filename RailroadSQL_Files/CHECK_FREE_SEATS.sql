DELIMITER //

/*
* This function will check if a particular train has free seats along a particular set of
* it's segments. This is important for when a customer wishes to purchase a ticket for 
* a particular date and time. If there are seats available, the function will return a
* single bit with the value 1. If there are not available seats along the route, the value
* 0 will be returned instead.
*/
CREATE FUNCTION CHECK_FREE_SEATS(ORIGIN INT(11), DESTIN INT(11), LOCAL_TRAIN_ID INT(11), LOCAL_DATE DATE) RETURNS BIT
BEGIN
        DECLARE LOCAL_SEGMENT_ID INT(11);
        DECLARE LOCAL_NORTH_END INT(11);
        DECLARE LOCAL_SOUTH_END INT(11);
        DECLARE DIRECTION_INT INT(11);
        DECLARE NUMBER_SEATS_FREE INT(11);
        DECLARE IS_FREE BIT;
        SET DIRECTION_INT = ORIGIN - DESTIN;
        
        SET IS_FREE = 1;

        /*
        * The IF statement below checks the LOCAL_TRAIN_ID passed in as a parameter in this function.   
        * If the passed parameter is null, it returns the IS_FREE parameter set to 0. This is because
        * you can not check available seating for a NULL TRAIN_ID. 
        */
        IF LOCAL_TRAIN_ID IS NULL THEN
           SET IS_FREE = 0;
           RETURN IS_FREE;
        END IF;

        /*
        * By subtracting the ORIGIN station from the DESTINATION station for a given TRIP, 
        * it is possible to determine the direction of the train. This is because the segment numbers
        * count up when travelling south bound. 
        */
        IF DIRECTION_INT < 0 THEN

           SET LOCAL_SEGMENT_ID = (SELECT SEGMENT_ID FROM S18336PRRteam1.SEGMENT WHERE NORTH_END = ORIGIN);

           SET LOCAL_SOUTH_END = (SELECT SOUTH_END FROM S18336PRRteam1.SEGMENT WHERE SEGMENT_ID = LOCAL_SEGMENT_ID);


           /*
           * This while loop iterates through each segment until the destination segment has been reached. Since this
           * train is travelling southbound, the South end of the segment will be where the trip terminates.
           */
           WHILE LOCAL_SOUTH_END != DESTIN+1 DO

                 SET NUMBER_SEATS_FREE = (SELECT `SEATS_FREE` FROM S18336PRRteam1.SEATS_FREE WHERE SEGMENT_ID = LOCAL_SEGMENT_ID AND TRAIN_ID = LOCAL_TRAIN_ID AND `DATE` = LOCAL_DATE);

                 /*
                 * If the number of seats free is 0 in any of the iterated through segments, this program will
                 * return IS_FREE is equal to 0. 
                 */
                 IF NUMBER_SEATS_FREE = 0 THEN  
                    SET IS_FREE = 0;
                    RETURN IS_FREE;
                 END IF;

                 SET LOCAL_SEGMENT_ID = LOCAL_SEGMENT_ID + 1;
                 SET LOCAL_SOUTH_END = (SELECT SOUTH_END FROM S18336PRRteam1.SEGMENT WHERE SEGMENT_ID = LOCAL_SEGMENT_ID);
           END WHILE;
        END IF;

        /*
        * When the result from subtracting the ORIGIN from the DESTINATION is positive, you know the Trip is
        * northbound. Likewise, you know that the train will stop in the north end of a given segment. The
        * block within this if statement does the same as the southbound block, except now it is set up
        * to stop at the north end station. 
        */
        IF DIRECTION_INT > 0 THEN
 
           SET LOCAL_SEGMENT_ID = (SELECT SEGMENT_ID FROM S18336PRRteam1.SEGMENT WHERE SOUTH_END = ORIGIN);

           SET LOCAL_NORTH_END = (SELECT NORTH_END FROM S18336PRRteam1.SEGMENT WHERE SEGMENT_ID = LOCAL_SEGMENT_ID);
           WHILE LOCAL_NORTH_END != DESTIN+1 DO
                 
                 SET NUMBER_SEATS_FREE = (SELECT `SEATS_FREE` FROM S18336PRRteam1.SEATS_FREE WHERE SEGMENT_ID = LOCAL_SEGMENT_ID AND TRAIN_ID = LOCAL_TRAIN_ID AND `DATE` = LOCAL_DATE);
                 IF NUMBER_SEATS_FREE = 0 THEN
                    SET IS_FREE = 0;
                    RETURN IS_FREE;
                 END IF;
                 
                 SET LOCAL_SEGMENT_ID = LOCAL_SEGMENT_ID - 1;
                 SET LOCAL_NORTH_END = (SELECT NORTH_END FROM S18336PRRteam1.SEGMENT WHERE SEGMENT_ID = LOCAL_SEGMENT_ID);
           END WHILE;
        END IF;
        RETURN IS_FREE;
END //
DELIMITER ;
        
        
