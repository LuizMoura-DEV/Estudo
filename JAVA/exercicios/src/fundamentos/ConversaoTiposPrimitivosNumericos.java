package fundamentos;

public class ConversaoTiposPrimitivosNumericos {
	
	public static void main(String[] args) {
		double a = 1;
		System.out.println(a);						// implicita
					
		float b = (float) 1.1234567888888888;		// explícita (CAST)
		System.out.println(b);
		
		int c = 130;
		byte d = (byte) c;							// explicita (CAST)
		System.out.println(d);
		
		double e = 1.9999999999;
		int f = (int) e;
		System.out.println(f);
	}
}
