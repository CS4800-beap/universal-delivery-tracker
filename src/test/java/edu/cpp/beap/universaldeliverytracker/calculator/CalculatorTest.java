package edu.cpp.beap.universaldeliverytracker.calculator;

import org.junit.*;
import org.junit.jupiter.api.Test;

import edu.cpp.beap.universaldeliverytracker.calculator.Calculator;

public class CalculatorTest {
	
	@Test
	public void testAdd() {
		Calculator c = new Calculator();
		int res = c.add(10,20);
		Assert.assertEquals(30, res);
	}

}
