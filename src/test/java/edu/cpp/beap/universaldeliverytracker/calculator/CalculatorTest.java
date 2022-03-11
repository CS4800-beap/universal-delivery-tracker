package edu.cpp.beap.universaldeliverytracker.calculator;

import org.junit.*;
import org.junit.jupiter.api.Test;

public class CalculatorTest {
	
	@Test
	public void testAdd() {
		Calculator c = new Calculator();
		int res = c.add(10,20);
		Assert.assertEquals(30, res);
	}

	@Test
	public void testAdd2() {
		Calculator c = new Calculator();
		int res = c.add(-10,-20);
		Assert.assertEquals(-30, res);
	}

	@Test
	public void testAdd3() {
		Calculator c = new Calculator();
		int res = c.add(-10, 20);
		Assert.assertEquals(10, res);
	}
}
