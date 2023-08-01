-- creates sql tables

-- colors used in each episode
CREATE TABLE IF NOT EXISTS colors_used (
    id int,
    painting_index int,
    img_src varchar(255),
    painting_title varchar(255),
    season varchar(255),
    episode varchar(255),
    num_colors varchar(255),
    youtube_src varchar(255),
    colors varchar(255),
    color_hex varchar(255),
    Black_Gesso varchar(255),
    Bright_Red varchar(255),
    Burnt_Umber varchar(255),
    Cadmium_Yellow varchar(255),
    Dark_Sienna varchar(255),
    Indian_Red varchar(255),
    Indian_Yellow varchar(255),
    Liquid_Black varchar(255),
    Liquid_Clear varchar(255),
    Midnight_Black varchar(255),
    Phthalo_Blue varchar(255),
    Phthalo_Green varchar(255),
    Prussian_Blue varchar(255),
    Sap_Green varchar(255),
    Titanium_White varchar(255),
    Van_Dyke_Brown varchar(255),
    Yellow_Ochre varchar(255),
    Alizarin_Crimson varchar(255)
);

LOAD DATA INFILE '/var/lib/mysql-files/Colors_Used.csv' 
INTO TABLE colors_used
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

select id from colors_used;
