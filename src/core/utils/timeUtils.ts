/**
 * Utility functions for time-related operations.
 */
export const timeUtils = {
  /**
   * Calculates the countdown time from the current time to a specified future time.
   *
   * @param {string} time - The future time in a string format that can be parsed by the Date constructor.
   * @returns {string} A string representing the countdown in the format "HH:MM:SS".
   * If the future time has already passed or is invalid, it returns "00:00:00".
   */
  getCountdown: (time: string): string => {
    // Parse the future time
    const futureTime = new Date(time);

    // Validate the date
    if (isNaN(futureTime.getTime())) {
      console.warn("Invalid date format provided.");
      return "00:00:00";
    }

    const currentTime = new Date();
    const timeDifference = futureTime.getTime() - currentTime.getTime();

    if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Format the countdown as "HH:MM:SS"
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    } else {
      // If the time has passed, return "00:00:00"
      return "00:00:00";
    }
  },
};
