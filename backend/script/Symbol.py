from Point import Point


class Symbol:
  def __init__(self, character: str, confidence: int, p_lb: Point, p_rb: Point, p_rt: Point, p_lt: Point):
    self.character = character
    self.confidence = confidence
    self.p_lb = p_lb
    self.p_rb = p_rb
    self.p_rt = p_rt
    self.p_lt = p_lt
