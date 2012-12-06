package br.com.gpbus.util;

import java.util.ArrayList;

public class DataRequest{
	private ArrayList<Double> src;
	private ArrayList<Double> dst;
	private double maxDistance;
	
	public DataRequest() {			
	}
	
	public ArrayList<Double> getSrc() {
		return src;
	}
	public void setSrc(ArrayList<Double> src) {
		this.src = src;
	}
	public ArrayList<Double> getDst() {
		return dst;
	}
	public void setDst(ArrayList<Double> dst) {
		this.dst = dst;
	}
	public double getMaxDistance() {
		return maxDistance;
	}
	public void setMaxDistance(double maxDistance) {
		this.maxDistance = maxDistance;
	}
	@Override
	public String toString() {
		return String.format(
				"%s[src(%s,%s) - dst(%s,%s) - maxDistance:%s]",
				getClass().getSimpleName(),
				getSrc().get(0),
				getSrc().get(1),
				getDst().get(0),
				getDst().get(1),
				getMaxDistance());
	}
	
}