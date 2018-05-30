DELIMITER //

CREATE PROCEDURE FILL_SEATSFREE()
BEGIN
        DECLARE LOCAL_TRAIN_ID INT(11);
        DECLARE LOCAL_SEGMENT_ID INT(11);
        DECLARE LOCAL_DATE DATE;
        DECLARE TRAIN_INDEX INT(3);
        DECLARE DATE_INDEX INT(3);
        DECLARE SEGMENT_INDEX INT(3);
        DECLARE LOCAL_WKD_BIN INT(1);
        SET TRAIN_INDEX = 0;
        SET DATE_INDEX = 0;
        SET SEGMENT_INDEX = 0;
        
        SET LOCAL_DATE = SYSDATE();

        /*
        * There are three nested loops below. The outermost loop is called DATE_LOOP, the middle loop
        * is called TRAIN_LOOP and the innermost loop is called SEGMENT_LOOP. This entire procedures
        * job is to initialize the SEATS_FREE table for every single train at every single segment 
        * for an entire year ahead of time. This is why three nested loops are required.
        * Number Of Inserts: 365 x 32 x 25. (It might take a while.)
        */
        DATE_LOOP: LOOP

                SET LOCAL_DATE = (SELECT DATE_ADD(LOCAL_DATE, INTERVAL 1 DAY));

                TRAIN_LOOP: LOOP

                            SET LOCAL_TRAIN_ID = (SELECT TRAIN_ID FROM S18336PRRteam1.TRAIN ORDER BY TRAIN_ID LIMIT 1 OFFSET TRAIN_INDEX);
                            SET LOCAL_WKD_BIN = (SELECT WKD_BIN FROM S18336PRRteam1.TRAIN WHERE TRAIN_ID = LOCAL_TRAIN_ID);
                            
                            SEGMENT_LOOP: LOOP

                                          SET LOCAL_SEGMENT_ID = (SELECT SEGMENT_ID FROM S18336PRRteam1.SEGMENT ORDER BY SEGMENT_ID LIMIT 1 OFFSET SEGMENT_INDEX);
                                          IF (SELECT WEEKDAY(LOCAL_DATE)) <= 4 THEN
                                             IF LOCAL_WKD_BIN = 1 THEN
                                                INSERT INTO SEATS_FREE (`SEGMENT_ID`, `TRAIN_ID`, `DATE`, `SEATS FREE`) VALUES (LOCAL_SEGMENT_ID, LOCAL_TRAIN_ID, LOCAL_DATE, '448');
                                             END IF;
                                             
                                             IF LOCAL_WKD_BIN = 0 THEN
                                                INSERT INTO SEATS_FREE (`SEGMENT_ID`, `TRAIN_ID`, `DATE`, `SEATS FREE`) VALUES (LOCAL_SEGMENT_ID, LOCAL_TRAIN_ID, LOCAL_DATE, '0');
                                             END IF;
                                          END IF;

                                          IF (SELECT WEEKDAY(LOCAL_DATE)) > 4 THEN
                                             IF LOCAL_WKD_BIN = 1 THEN
                                                INSERT INTO SEATS_FREE (`SEGMENT_ID`, `TRAIN_ID`, `DATE`, `SEATS FREE`) VALUES (LOCAL_SEGMENT_ID, LOCAL_TRAIN_ID, LOCAL_DATE, '0');
                                             END IF;
                                             
                                             IF LOCAL_WKD_BIN = 0 THEN
                                                INSERT INTO SEATS_FREE (`SEGMENT_ID`, `TRAIN_ID`, `DATE`, `SEATS FREE`) VALUES (LOCAL_SEGMENT_ID, LOCAL_TRAIN_ID, LOCAL_DATE, '448');
                                             END IF;
                                          END IF;

                                          SET SEGMENT_INDEX = SEGMENT_INDEX + 1;
                                          IF SEGMENT_INDEX < 25 THEN
                                             ITERATE SEGMENT_LOOP;
                                          END IF;
                                          SET SEGMENT_INDEX = 0;
                                          LEAVE SEGMENT_LOOP;

                            END LOOP SEGMENT_LOOP;

                            SET TRAIN_INDEX = TRAIN_INDEX + 1;
                            IF TRAIN_INDEX < 32 THEN
                               ITERATE TRAIN_LOOP;
                            END IF;
                            SET TRAIN_INDEX = 0;
                            LEAVE TRAIN_LOOP;

                END LOOP TRAIN_LOOP;

                SET DATE_INDEX = DATE_INDEX + 1;
                IF DATE_INDEX < 365 THEN
                   ITERATE DATE_LOOP;
                END IF;
                
                LEAVE DATE_LOOP;

        END LOOP DATE_LOOP;
END //
DEILIMITER ;
