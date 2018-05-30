I updated the SEATS_FREE, SEGMENT, and TRAIN tables since I last sent you the CREATE_TABLES.sql file.

In procedure GET_PRICE, the input parameter AGE should be either 0, 1, or 2.
Input value 0 represents child ticket, 1 represents adult ticket, and 2 represents elderly ticket.
Input DIS_BIN is a bit representing disability. If yes, put 1, otherwise put 0.
Input MILIT_BIN is a bit representing military. If yes, put 1, otherwise put 0.
Input PET_NUM is an int representing the number of pets. Can be 0 to anything (not negative).
Input TRIP_DATE is date of the trip in 'YYYY-MM-DD' format.
Input RES_DATE is date of the reservation.

Output PRICE is a double(6,2).
When calling GET_PRICE, have a local variable (ex: @FULL_PRICE) as input for the OUT value.
	call GET_PRICE('11', '24', 0, 0, '1', '2', '2018-06-18', '2018-05-26', @FULL_PRICE);
To retrieve the output value, call
	SELECT @FULL_PRICE;

Calling DELETE_ALL empties all tables in an order where foreign keys are not a problem.
Calling FILL_ALL fills all necessary tables (all tables except for RESERVATION, PASSENGER, and TRIP)
in an order where foreign keys are not a problem.

Before calling FILL_ALL, ALWAYS call DELETE_ALL first.
Calling FILL_ALL will take a long time since it will have to generate thousands of entries in the tables.

All procedures and functions in the included SQL files are already in the database.
There is no need to manually fill in the tables, calling the relevent FILL_<table> procedure will fill in the relevant table.