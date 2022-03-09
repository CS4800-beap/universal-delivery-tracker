package edu.cpp.beap.demo.calculator;

import org.junit.*;
import org.junit.jupiter.api.Test;

public class CalculatorTest {
	
	@Test
	public void testAdd() {
		Calculator c = new Calculator();
		int res = c.add(10,20);
		Assert.assertEquals(30, res);
	}

}
