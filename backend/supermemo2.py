"""
BASED ON Algorithm SM-2, (C) Copyright SuperMemo World, 1991.
https://www.supermemo.com
https://www.supermemo.eu
"""

"""q varriants:
    0 - not known at all, to repeat
    1 - not well known
    4 - correct answer after some hesitation
    5 - instant, perfect answer
"""

def supermemo(q: int, n: int, EF: float, I: int) -> (int, float, int):
    """
    input:  user grade q
            repetition number n
            easiness factor EF
            interval I
    output: updated values of n, EF, I
    """
    if q >= 4:
        if n == 0:
            I = 1
        elif n == 1:
            I = 6
        else:
            I = round(I*EF)
        n = n + 1

    else:
        n = 0
        I = 1

    EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    EF = max(1.3, EF)

    return (n, EF, I)


""" EXAMPLE USAGE:
supermemo(4, 0, 2.5, 0)
(1, 2.5, 1)
"""