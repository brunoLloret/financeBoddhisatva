#!/bin/bash

# Define paths
SCRAPER_SCRIPT="/Users/brunolloretfuentes/Desktop/BootCamp/Week-07/NeonScraper/BE/scraper/script.ts"
LOG_FILE="/Users/brunolloretfuentes/Desktop/BootCamp/Week-07/NeonScraper/BE/scraper/log.txt"
EMAIL_RECIPIENT="brunolloretfuentes@gmail.com"
EMAIL_SUBJECT="Scraping Error Notification"
EMAIL_BODY="The scraping script did not execute successfully. Please check the logs for details."

# Run the scraper script
echo "Running scraper script at $(date)" >> /Users/brunolloretfuentes/Desktop/BootCamp/Week-07/NeonScraper/BE/scraper/monitoring.log
node $SCRAPER_SCRIPT >> /Users/brunolloretfuentes/Desktop/BootCamp/Week-07/NeonScraper/BE/scraper/monitoring.log 2>&1

# Check if the log file or data file was created
if [ ! -f $LOG_FILE ]; then
    # Send email notification if log file/data is not found
    echo "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" $EMAIL_RECIPIENT
    echo "Error notification sent at $(date)" >> /Users/brunolloretfuentes/Desktop/BootCamp/Week-07/NeonScraper/BE/scraper/monitoring.log
else
    echo "Scraping completed successfully at $(date)" >> /Users/brunolloretfuentes/Desktop/BootCamp/Week-07/NeonScraper/BE/scraper/monitoring.log
fi
