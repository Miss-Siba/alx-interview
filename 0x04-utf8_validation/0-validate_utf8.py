#!/usr/bin/python3
""" Determines if a given data set represents a valid UTF-8 encoding"""


def validUTF8(data):
    """
    Determine if a given data set represents a valid UTF-8 encoding.

    Args:
    data: List[int] - a list of integers representing the byte values.

    Returns:
    bool - True if the data set is a valid UTF-8 encoding, False otherwise.
    """
    i = 0
    while i < len(data):
        byte = data[i]

        # Determine the number of bytes in the current UTF-8 character
        if byte & 0b10000000 == 0:
            num_bytes = 1
        elif byte & 0b11100000 == 0b11000000:
            num_bytes = 2
        elif byte & 0b11110000 == 0b11100000:
            num_bytes = 3
        elif byte & 0b11111000 == 0b11110000:
            num_bytes = 4
        else:
            return False

        # Check that the subsequent bytes are valid
        for j in range(1, num_bytes):
            if i + j >= len(data):
                return False
            if data[i + j] & 0b11000000 != 0b10000000:
                return False

        i += num_bytes

    return True
